angular.module('app')
    .filter('brDate', function () {
        return function (data) {
            return moment(data).format('DD/MM/YYYY HH:mm:ss');
        };
    })
    .filter('cpfcnpj', function () {
        return function (data) {
            if (data) {
                if (data.length == 11) {
                    return data.replace(/\D/g, '').replace(/^(\d{3})(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4');
                } else if (data.length == 14) {
                    return data.replace(/\D/g, '').replace(/^(\d{2})(\d{3})?(\d{3})?(\d{4})?(\d{2})?/, '$1.$2.$3/$4-$5');
                }else {
                    return data;
                }
            }
        };
    })
    .filter('fillOrderNumber', function () {
        return function (data) {
            if (data) {
                var str = data.toString();
                var pad = "0000000000";
                var ans = pad.substring(0, pad.length - str.length) + str;
                return ans;
            }
        };
    })
    .filter('phone', function () {
        return function (tel, typeFormat) {
            if (!tel) { return ''; }

            var value = tel.toString().trim().replace(/^\+/, '');

            if (value.match(/[^0-9]/)) {//se for numerico
                return tel;
            }

            var cod;
            var pt1;
            var pt2;

            switch (value.length) {
                case 10: // +1PPP####### -> C (PPP) ###-####
                    cod = value.slice(0, 2);
                    pt1 = value.slice(2, 6);
                    pt2 = value.slice(6, 10);
                    break;

                case 11: // +CPPP####### -> CCC (PP) ###-####
                    cod = value.slice(0, 2);
                    pt1 = value.slice(2, 7);
                    pt2 = value.slice(7, 11);
                    break;

                default:
                    if (value.length == 9) {
                        pt1 = value.slice(0, 5);
                        pt2 = value.slice(5, 9);
                    } else {
                        pt1 = value.slice(0, 4);
                        pt2 = value.slice(4, 8);
                    }

                    break;
            }

            if (typeFormat == 'onlyNumber') {
                return (pt1 + ' - ' + pt2).trim();
            }else if (typeFormat == 'onlyDDD') {
                if (value.length > 9) {
                    return cod;
                } else {
                    return 'Sem DDD';
                }
            } else {
                return ('(' + cod + ')' + pt1 + ' - ' + pt2).trim();
            }
        };
    });
