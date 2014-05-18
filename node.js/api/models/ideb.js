var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('ideb', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'ideb' database");
        db.collection('municipios', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'municipios' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.addMunicipio = function(req, res) {
    var municipio = req.body;
    console.log('Adding municipio: ' + JSON.stringify(wine));
    db.collection('municipios', function(err, collection) {
        collection.insert(wine, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
};

exports.findAllMunicipios = function(req, res) {
    db.collection('municipios', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.findMunicipiosByUF = function(req, res) {
    db.collection('municipios', function(err, collection) {
        collection.find({"uf":req.params.uf}).toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.findByUFandAno = function(req, res) {
};

//var populateDB = function() {
//	var dados = [
//		{"codigo_municipio": 5218052, "nome_municipio": "Serra", "uf": "ES", "redes": {"municipal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, }, "anos_finais": {"2005": 180.8, } }, "projecoes": {"anos_iniciais": {"2005": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "estadual": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "publica": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "federal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } } } },
//		{"codigo_municipio": 124214, "nome_municipio": "Vitoria", "uf": "ES", "redes": {"municipal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, }, "anos_finais": {"2005": 180.8, } }, "projecoes": {"anos_iniciais": {"2005": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "estadual": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "publica": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "federal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } } } },
//		{"codigo_municipio": 41241, "nome_municipio": "Castelo", "uf": "ES", "redes": {"municipal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, }, "anos_finais": {"2005": 180.8, } }, "projecoes": {"anos_iniciais": {"2005": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "estadual": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "publica": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "federal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } } } },
//		{"codigo_municipio": 63, "nome_municipio": "Aimores", "uf": "MG", "redes": {"municipal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, }, "anos_finais": {"2005": 180.8, } }, "projecoes": {"anos_iniciais": {"2005": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "estadual": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "publica": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "federal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } } } },
//		{"codigo_municipio": 1241, "nome_municipio": "Belo Horizonte", "uf": "MG", "redes": {"municipal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, }, "anos_finais": {"2005": 180.8, } }, "projecoes": {"anos_iniciais": {"2005": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "estadual": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "publica": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "federal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } } } },
//		{"codigo_municipio": 214, "nome_municipio": "Brasilia", "uf": "DF", "redes": {"municipal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, }, "anos_finais": {"2005": 180.8, } }, "projecoes": {"anos_iniciais": {"2005": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "estadual": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "publica": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } }, "federal": {"taxa_aprovacao": {"anos_iniciais": {"2007": {"ano_1": null, "ano_2": 83.3, "ano_3": 88.6, "ano_4": 88.5, "ano_5": 87.5, "ano_1a5": 87.1, "indicador_rendimento_1a5": 0.87 } }, "anos_finais": {"2007": {"ano_6": null, "ano_7": 83.3, "ano_8": 88.6, "ano_9": 88.5, "ano_6a9": 87.1, "indicador_rendimento_6a9": 0.87 } } }, "nota_prova_brasil": {"anos_iniciais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } }, "anos_finais": {"2005": {"matematica": 180.8, "lingua_portuguesa": 164.2, "nota_media_padronizada": 4.74 } } }, "ideb": {"anos_iniciais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 }, "anos_finais": {"2005": 180.8, "2006": 180.8, "2007": 180.8 } }, "projecoes": {"anos_iniciais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 }, "anos_finais": {"2007": 4.2, "2009": 4.2, "2011": 4.2, "2015": 4.2, "2017": 4.2 } } } } }
//	];
//	db.collection('municipios', function(err, collection) {
//    	collection.insert(dados, {safe:true}, function(err, result) {});
//	});
//};