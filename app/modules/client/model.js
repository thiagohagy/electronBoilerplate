

var Datastore = require('nedb');

angular.module('client').service('ClientModel', ClientModel);

ClientModel.$inject = ['myConfig', '$q'];

function ClientModel(myConfig, $q) {

    var Model = new Datastore({ filename: myConfig.dbPath + 'client.json', autoload: true });

    var vm = this;

    vm.save = save;
    vm.getAll = getAll;
    vm.excluir = excluir;
    vm.get = get;
    vm.update = update;

    var Schema = {
        nome: '', // name
        contato: [  // contacts
            {
                nome: '',
                telefone: '',
            },
        ],
        endereco: '', // address
        cidadeEstado: '', // city / state
        obs: '',
    };

    function save(dados) {
        var d = $q.defer();

        var doc = {};
        doc.nome = dados.nome;
        doc.contatos = angular.toJson(dados.contatos);
        doc.obs = dados.obs;
        doc.endereco = dados.endereco;
        doc.endereco = dados.endereco;
        doc.ativo = true;
        doc.cidadeEstado = dados.cidadeEstado;
        doc.created = moment().toString();

        Model.insert(doc, function (err, newDoc) {
            if (!err) {
                d.resolve({ data: newDoc, msg: 'Client saved', success: true });
            } else {
                d.resolve({ data: '', msg: err, success: false });
            }
        });

        return d.promise;
    }

    function update(dados) {
        var d = $q.defer();

        if (dados._id) {
            var where = { _id: dados._id };

            Model.findOne(where, function (err, doc) {
                if (doc) {

                    var doc = {};
                    doc.nome = dados.nome;
                    doc.contatos = angular.toJson(dados.contatos);
                    doc.obs = dados.obs;
                    doc.endereco = dados.endereco;
                    doc.cpfcnpj = dados.cpfcnpj;
                    doc.rgie = dados.rgie;
                    doc.im = dados.im;
                    doc.endereco = dados.endereco;
                    doc.cidadeEstado = dados.cidadeEstado;

                    Model.update(where, doc, function (err, updateDoc) {
                        if (!err) {
                            d.resolve({ data: updateDoc, msg: 'Client updated', success: true });
                        } else {
                            d.resolve({ data: '', msg: err, success: false });
                        }
                    });

                } else {
                    d.resolve({ data: '', msg: 'Client not found', success: false });
                }
            });
        } else {
            d.resolve({ data: '', msg: 'Id not received', success: false });
        }

        return d.promise;
    }

    function getAll(filtro) {
        var d = $q.defer();

        var filter = {};
        filter.ativo = { $ne: false };

        if (filtro.busca) {
            filter.$or = [];
            filter.$or.push({ endereco: { $regex: new RegExp(filtro.busca, 'i') } });
            filter.$or.push({ nome: { $regex: new RegExp(filtro.busca, 'i') } });
            filter.$or.push({ cidadeEstado: { $regex: new RegExp(filtro.busca, 'i') } });
            filter.$or.push({ obs: { $regex: new RegExp(filtro.busca, 'i') } });
        }

        let skip = filtro.skip ? filtro.skip : 0;
        let limit = filtro.limit ? filtro.limit : 10;

        let query = Model.find(filter);
        query.skip(skip);
        query.limit(limit);
        query.sort({ nome: 1 });
        query.exec(function (err, docs) {
            if (!err) {
                var query2 = Model.count(filter);
                query2.exec(function (err, total) {
                    d.resolve({ data: docs, msg: 'Clients found', success: true, total: total });
                });
            } else {
                d.resolve({ data: '', msg: err, success: false });
            }
        });

        return d.promise;

    }

    function get(filtro) {
        var d = $q.defer();

        var filter = {};

        if (filtro.id) filter._id = filtro.id;
        if (filtro.nome) filter.nome = filtro.nome;
        if (filtro.endereco) filter.endereco = filtro.endereco;

        Model.findOne(filtro, function (err, doc) {
            if (!err && doc) {
                doc.contatos = JSON.parse(doc.contatos);

                d.resolve({ data: doc, msg: 'Clients found', success: true });
            } else {
                d.resolve({ data: '', msg: err, success: false });
            }
        });

        return d.promise;

    }

    function excluir(id) {
        var d = $q.defer();

        if (confirm('Do you want to remove this client?')) {
            if (id) {
                Model.update({ _id: id }, { $set: { ativo: false } }, function (err, status) {
                    if (!err) {
                        d.resolve({ data: status, msg: 'Client removed', success: true });
                    } else {
                        d.resolve({ data: '', msg: err, success: false });
                    }
                });
            }
        }

        return d.promise;
    }

}
