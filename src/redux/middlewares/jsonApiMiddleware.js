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

  function addRelationsToObject(relationName, relationFrom, newRelations) {
    relations[relationName] = relations[relationName] || {};
    if(Array.isArray(newRelations)) {
      relations[relationName][relationFrom] = relations[relationName][relationFrom] || []
      for(const relationTo of newRelations) {
        relations[relationName][relationFrom].push(relationTo.id);
      }
    } else {
      relations[relationName][relationFrom] = newRelations.id;
    }
  }

  if(relationMap === Object(relationMap) && relationMap['primary'] !== undefined) {
    const {name, id} = relationMap['primary'];
    for(const entity of primaryData) {
        const relation = {id:entity.id};
        addRelationsToObject(name, id, Array.isArray(data) ? [relation] : relation);
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
        const name = relationMap[apiRelationName]
        addRelationsToObject(name, id, entityRelations[apiRelationName].data);
      }
    } else if(entityRelations) { //relationMap is just true value, relations are mapped to the same as they are with default multi:true
      for(const apiRelationName of Object.keys(entityRelations)) {
        addRelationToObject(apiRelationName, id, entityRelations[apiRelationName].data);
      }
    }
  }

  dispatch(addEntity(entities));
  dispatch(addRelations(relations));

  return next(action);
}
