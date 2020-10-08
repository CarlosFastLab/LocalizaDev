const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const { index } = require('../models/utils/PointSchema');
const { update } = require('../models/Dev');

//index (lista), show (unico), store (criar), update (alterar), destroy (deletar)

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },


    async store(request, response) { 
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username }); //Verificação da existência de um dev já cadastrado no BD com o username passado
        if (!dev){ // Caso o dev não exista no BD
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            const { name = login, avatar_url, bio } = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }      
        return response.json(dev);
    },

    async update(){
        // A implementar
    },

    async destroy(){
        // A implementar
    },
};