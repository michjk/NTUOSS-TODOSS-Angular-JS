var TodoHelper = angular.module('TodoHelper', ['LocalStorageModule']);

TodoHelper.service('TodoList', function(localStorageService) {
    var activeItemCount = 0;
    var list = [];


    if (localStorageService.isSupported && localStorageService.get('list')) {
        list = localStorageService.get('list');
        activeItemCount = localStorageService.get('activeItemCount');
    }

    var save = function () {
        if (localStorageService.isSupported) {
            localStorageService.set('list', list);
            localStorageService.set('activeItemCount', activeItemCount);
        }
    };

    this.add = function (text) {
        var new_item = {
            text: text,
            done: false,
            deleted: false
        };
        activeItemCount ++;
        list.push(new_item);
        save();
    };

    this.toggle = function(id) {
        activeItemCount += list[id].done ? 1 : -1;
        list[id].done = ! list[id].done;
        save();
    };

    this.delete = function(id) {
        if (!list[id].done) return;
        list[id].deleted = true;
        save();
    };

    this.clear = function() {
        list.splice(0);
        activeItemCount = 0;
        save();
    };

    this.activeItemCount = function() {
        return activeItemCount;
    };

    this.list = list;

});