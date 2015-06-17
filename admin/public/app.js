(function () {
    "use strict";

    var app = angular.module('myApp', ['ng-admin']);
 app.config(function (NgAdminConfigurationProvider, Application, Entity, Field, Reference, ReferencedList, ReferenceMany, RestangularProvider, $stateProvider) {

        var app = new Application('ng-admin backend demo')
            .baseApiUrl('http://localhost:3000/api/');

        var ingredient = new Entity('ingredients');
        var recipe     = new Entity('recipes');
        var glass      = new Entity('glasses');

        app
            .addEntity(ingredient)
            .addEntity(recipe)
            .addEntity(glass);

        /**
         * Posts
         */

        // customize Post URL with trailing slash
        ingredient.url(function(view, entityId) {
            return 'ingredients/' + (angular.isDefined(entityId) ? entityId : '');
        });

        ingredient.menuView()
            .icon('<span class="glyphicon glyphicon-file"></span>');

        ingredient.dashboardView()
            .title('Recent ingredients')
            .order(1)
            .limit(5)
            .fields([new Field('title').isDetailLink(true).map(truncate)]);

        ingredient.listView()
            .title('All ingredients')
            .description('List of ingredients with pagination')
            .perPage(25)
            .fields([
                new Field('index'),
                new Field('name'),
                new Field('recipeCount'),
                new Field('colors'),
                new Field('selectedColor')
            ])
            .listActions(['show', 'edit', 'delete']);

        ingredient.creationView()
            .fields([
                new Field('name')
                    .attributes({ placeholder: 'ingredient title' })
                    .validation({ required: true, minlength: 3, maxlength: 100 }),
                new Field('body').type('wysiwyg')
            ]);

       ingredientt.editionView()
            .title('Edit ingredient "{{ entry.values.title }}"')
            .actions(['list', 'show', 'delete'])
            .fields([
                post.creationView().fields()
            ]);

        post.showView()
            .fields([
                new Field('index'),
                post.editionView().fields()
            ]);

        /**
         * Comments
         */
//
        //// customize Post URL with trailing slash
        //comment.url(function(view, entityId) {
        //    return 'comments/' + (angular.isDefined(entityId) ? entityId : '');
//        //});
//
//        //comment.menuView()
//        //    .order(2)
//        //    .icon('<span class="glyphicon glyphicon-envelope"></span>');
//
//        //comment.dashboardView()
//        //    .title('Last comments')
//        //    .order(2)
//        //    .limit(5)
//        //    .fields([
//        //        new Field('id'),
//        //        new Field('body').label('Comment').map(truncate),
//        //        new Field()
//        //            .type('template')
//        //            .label('Actions')
//        //            .template('<custom-post-link></custom-post-link>')
//        //    ]);
//
//        //comment.listView()
//        //    .title('Comments')
//        //    .perPage(10)
//        //    .fields([
//        //        new Field('id').label('ID'),
//        //        new Field('createdAt').label('Posted').type('date'),
//        //        new Field('body').map(truncate)
//        //    ])
//        //    .listActions(['edit', 'delete']);
//
//        //comment.creationView()
//        //    .fields([
//        //        new Field('createdAt').label('Posted').type('date'),
//        //        new Field('body').type('wysiwyg'),
//        //        new Reference('post')
//        //            .label('Post')
//        //            .map(truncate)
//        //            .targetEntity(post)
//        //            .targetField(new Field('title'))
//        //    ]);
//
//        //comment.editionView()
//        //    .fields(comment.creationView().fields())
//        //    .fields([
//        //        new Field()
//        //            .type('template')
//        //            .label('Actions')
//        //            .template('<custom-post-link></custom-post-link>')
//        //    ]);
//
//        //comment.deletionView()
//        //    .title('Deletion confirmation');
//
//        ///**
//        // * Tags
//        // */
//        //tag.menuView().order(3);
//
//        //tag.dashboardView()
//        //    .title('Recent tags')
//        //    .order(3)
//        //    .limit(10)
//        //    .fields([
//        //        new Field('id').label('ID'),
//        //        new Field('name')
//        //    ]);
//
//        //tag.listView()
//        //    .infinitePagination(false)
//        //    .fields([
//        //        tag.dashboardView().fields()
//        //    ]);
//
        NgAdminConfigurationProvider.configure(app);
    });
}());