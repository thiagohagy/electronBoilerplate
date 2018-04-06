

var Datastore = require('nedb');

angular.module('service').service('ServiceModel', ServiceModel);

ServiceModel.$inject = ['myConfig', '$q'];

function ServiceModel(myConfig, $q) {

    var Model = new Datastore({ filename: myConfig.dbPath + 'service.json', autoload: true });

    var vm = this;

    vm.save = save;
    vm.getAll = getAll;
    vm.excluir = excluir;
    vm.get = get;
    vm.update = update;

    var Schema = {
        codigo: '', // code
        descricao: '', // description
    };

    function save(dados) {
        var d = $q.defer();

        var doc = {};
        doc.codigo = dados.codigo;
        doc.descricao = dados.descricao;
        doc.ativo = true;
        doc.created = moment().toString();

        Model.insert(doc, function (err, newDoc) {
            if (!err) {
                d.resolve({ data: newDoc, msg: 'Service saved', success: true });
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
                    doc.codigo = dados.codigo;
                    doc.descricao = dados.descricao;

                    Model.update(where, doc, function (err, updateDoc) {
                        if (!err) {
                            d.resolve({ data: updateDoc, msg: 'Service updated', success: true });
                        } else {
                            d.resolve({ data: '', msg: err, success: false });
                        }
                    });

                } else {
                    d.resolve({ data: '', msg: 'Services not found', success: false });
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
            filter.$or.push({ codigo: { $regex: new RegExp(filtro.busca, 'i') } });
            filter.$or.push({ descricao: { $regex: new RegExp(filtro.busca, 'i') } });
        }

        let skip = filtro.skip ? filtro.skip : 0;
        let limit = filtro.limit ? filtro.limit : 10;

        var query = Model.find(filter);
        query.skip(skip);
        query.limit(limit);
        query.sort({ codigo: 1 });
        query.exec(function (err, docs) {
            var query2 = Model.count(filter);
            query2.exec(function (err, total) {
                if (!err) {
                    d.resolve({ data: docs, msg: 'Services found', success: true, total: total });
                } else {
                    d.resolve({ data: '', msg: err, success: false });
                }
            });
        });

        return d.promise;

    }

    function get(filtro) {
        var d = $q.defer();

        var filter = {};

        if (filtro.id) filter._id = filtro.id;
        if (filtro.codigo) filter.codigo = filtro.codigo;
        if (filtro.descricao) filter.descricao = filtro.descricao;

        Model.findOne(filtro, function (err, doc) {
            if (!err && doc) {
                d.resolve({ data: doc, msg: 'Service found', success: true });
            } else {
                d.resolve({ data: '', msg: err, success: false });
            }
        });

        return d.promise;

    }

    function excluir(id) {
        var d = $q.defer();

        if (confirm('Do you want to remove this service?')) {
            if (id) {
                Model.update({ _id: id }, { $set: { ativo: false } }, function (err, status) {
                    if (!err) {
                        d.resolve({ data: status, msg: 'Service removed', success: true });
                    } else {
                        d.resolve({ data: '', msg: err, success: false });
                    }
                });
            }
        }

        return d.promise;
    }

}
