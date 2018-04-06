

angular.module('service')
.controller('ServiceController', ServiceController);

ServiceController.$inject = ['$state', '$stateParams', 'ServiceModel', 'toaster'];

function ServiceController($state, $stateParams, ServiceModel, toaster) {
    var vm = this;
    var stateDefault = 'service';

    vm.form = {};

    vm.clientes = [];
    vm.filtro = {};

    vm.save = save;
    vm.getAll = getAll;
    vm.excluir = excluir;

    /*Paginacao*/
    vm.pagination = {};
    vm.pagination.currentPage = 1;
    vm.pagination.itemsPerPage = 10;
    vm.pagination.total = 0;

    start();
    function start() {
        vm.getAll();

        if ($stateParams.id) {
            ServiceModel.get({ _id: $stateParams.id }).then(function (dados) {
                if (dados.data) vm.form = dados.data;
            });
        }

    }

    function save() {
        if (vm.form.descricao) {
            if (vm.form._id) {
                ServiceModel.update(vm.form).then(function (response) {
                    if (response.success) {
                        toaster.pop('success', 'Attention!!!', response.msg);
                        $state.go(stateDefault);
                    } else {
                        toaster.pop('error', 'Attention!!!', response.msg);
                    }
                });
            } else {
                ServiceModel.save(vm.form).then(function (response) {
                    if (response.success) {
                        toaster.pop('success', 'Attention!!!', response.msg);
                        $state.go(stateDefault);
                    } else {
                        toaster.pop('error', 'Attention!!!', response.msg);
                    }
                });
            }
        } else {
            toaster.pop('error', 'Atenção!!!', 'Insert description');
        }
    }

    function excluir(id) {
        ServiceModel.excluir(id).then(function (response) {
            if (response.success) {
                toaster.pop('success', 'Attention!!!', response.msg);
                vm.getAll();
            } else {
                toaster.pop('error', 'Attention!!!', response.msg);
            }
        });
    }

    function getAll(skip, limit) {
        var filtro = {};
        filtro.skip = skip;
        filtro.limit = limit;

        if (vm.filtro.busca)filtro.busca = vm.filtro.busca;

        ServiceModel.getAll(filtro).then(function (response) {
            if (response.success) {
                vm.pagination.total = response.total;
                vm.clientes = response.data;
            } else {
                toaster.pop('error', 'Attention!!!', response.msg);
            }
        });
    }

}
