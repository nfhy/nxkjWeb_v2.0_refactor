/**
 * Created by wangll on 2016/10/17.
 */
angular.module('naut')
    .controller('test', test);
function test($q) {
    function asyncGreet(name) {
        var deferred = $q.defer();  //通过$q.defer()创建一个deferred延迟对象，在创建一个deferred实例时，也会创建出来一个派生的promise对象，使用deferred.promise就可以检索到派生的promise。

        deferred.notify('About to greet ' + name + '.');  //延迟对象的notify方法。

        if (okToGreet(name)) {
            deferred.resolve('Hello, ' + name + '!');  //任务被成功执行
        } else {
            deferred.reject('Greeting ' + name + ' is not allowed.');  //任务未被成功执行
        }

        return deferred.promise;  //返回deferred实例的promise对象
    }

    function okToGreet(name) {
        //只是mock数据，实际情况将根据相关业务实现代码
        if (name == 'Superman') return true;
        else return false;
    }

    var promise = asyncGreet('Superman');  //获得promise对象
//promise对象的then函数会获得当前任务也就是当前deferred延迟实例的执行状态。它的三个回调函数分别会在resolve(), reject() 和notify()时被执行
    promise.then(function (greeting) {
        alert('Success: ' + greeting);
    }, function (reason) {
        alert('Failed: ' + reason);
    }, function (update) {
        alert('Got notification: ' + update);
    });
}