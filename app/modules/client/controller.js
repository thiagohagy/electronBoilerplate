

angular.module('client')
.controller('ClientController', ClientController);

ClientController.$inject = ['$state', '$stateParams', 'ClientModel', 'toaster'];

function ClientController($state, $stateParams, ClientModel, toaster) {
    var vm = this;
    var stateDefault = 'client';

    vm.form = {};
    vm.form.contatos = [{}];
    vm.filtro = {};

    vm.clientes = [];

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
            ClientModel.get({ _id: $stateParams.id }).then(function (dados) {
                if (dados.data) vm.form = dados.data;
            });
        }

    }

    function save() {
        if (vm.form.nome) {
            if (vm.form._id) {
                ClientModel.update(vm.form).then(function (response) {
                    if (response.success) {
                        toaster.pop('success', 'Attention!!!', response.msg);
                        $state.go(stateDefault);
                    } else {
                        toaster.pop('error', 'Attention!!!', response.msg);
                    }
                });
            } else {
                ClientModel.save(vm.form).then(function (response) {
                    if (response.success) {
                        toaster.pop('success', 'Attention!!!', response.msg);
                        $state.go(stateDefault);
                    } else {
                        toaster.pop('error', 'Attention!!!', response.msg);
                    }
                });
            }

        } else {
            toaster.pop('error', 'Attention!!!', "Insira o nome");
        }
    }

    function excluir(id) {
        ClientModel.excluir(id).then(function (response) {
            if (response.success) {
                toaster.pop('success', 'Attention!!!', response.msg);
                vm.getAll();
            } else {
                toaster.pop('error', 'Attention!!!', response.msg);
            }
        });
    }

    function getAll(skip) {
        var filtro = {};
        filtro.skip = skip;
        if (vm.filtro.busca)filtro.busca = vm.filtro.busca;
        ClientModel.getAll(filtro).then(function (response) {
            if (response.success) {
                vm.clientes = response.data;
                vm.pagination.total = response.total;
            } else {
                toaster.pop('error', 'Attention!!!', response.msg);
            }
        });

    }
}
