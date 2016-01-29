import {addEntity} from 'redux/modules/db/entities';
import {addRelations} from 'redux/modules/db/relations';

export default ({dispatch}) => next => action => {
  const {type, payload, error, meta} = action;

  if(error || !meta || !meta.jsonApi || !payload || !payload.data) { //TODO temporary error is here
    return next(action);
  }

  const cleanEntity = ({attributes,meta}) => {
    let cleanEntity = {attributes};
    if(meta !== undefined) {
      cleanEntity[meta] = meta;
    }
    return cleanEntity;
  }

  const {data, included} = payload.data;
  const {jsonApi:relationMap} = meta;

  const primaryData = Array.isArray(data) ? data : [data];
  const includedData =  Array.isArray(included) ? included : [];
  const responseData = primaryData.concat(includedData);

  let entities = {};
  let relations = {};

  function addRelationToObject(relationName, relationFrom, relationTo, multi = true) {
    relations[relationName] = relations[relationName] || {};
    if(multi) {
      relations[relationName][relationFrom] = relations[relationName][relationFrom] || []
      relations[relationName][relationFrom].push(relationTo);
    } else {
      relations[relationName][relationFrom] = relationTo;
    }
  }

  if(relationMap === Object(relationMap) && relationMap['primary'] !== undefined) {
    const {name, id, multi } = relationMap['primary'];
    for(const entity of primaryData) {
        addRelationToObject(name,id, entity.id, multi);
    }
  }

  for(const entity of responseData) {

    const {id,type:entityType,relationships:entityRelations} = entity;
    entities[entityType] = entities[entityType] || {};
    entities[entityType][id] = cleanEntity(entity);

    if(entityRelations && relationMap === Object(relationMap)) { //relationMap is object, not just true value
      for(const apiRelationName of Object.keys(entityRelations)) {
        if(relationMap[apiRelationName] === undefined) {
          console.warn(`Missing relation "${apiRelationName}" specification between entities in action with type ${type}, relation not added to state`);
          continue;
        }
        const {name, multi} = relationMap[apiRelationName]
        addRelationToObject(name, id, entityRelations[apiRelationName].data.id, multi);
      }
    } else if(entityRelations) { //relationMap is just true value, relations are mapped to the same as they are with default multi:true
      for(const apiRelationName of Object.keys(entityRelations)) {
        addRelationToObject(apiRelationName, id, entityRelations[apiRelationName].data.id);
      }
    }
  }

  dispatch(addEntity(entities));
  dispatch(addRelations(relations));

  return next(action);
}
