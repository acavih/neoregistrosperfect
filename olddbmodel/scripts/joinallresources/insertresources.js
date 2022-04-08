module.exports = async function insertResources (resources, Resource) {
    for (const resourceIndex in resources) {
        if (Object.hasOwnProperty.call(resources, resourceIndex)) {
            const { name: resourceName, model: ResourceModel } = resources[resourceIndex]
            console.log('insertando elementos de %s', resourceName)
            const resourcesItems = await ResourceModel.find({})
            const docs = resourcesItems.map(resource => ({
                type: resourceName,
                name: resource.name
            }))
            for (let index = 0; index < docs.length; index++) {
                const doc = docs[index]
                console.log(' * Creando %O', doc)
                await Resource.create(doc)
            }
        }
    }
}
