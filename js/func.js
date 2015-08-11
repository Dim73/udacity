$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);

        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date: Date.now()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                    note.content +
                    '<span class="note-date">' +
                    new Date(note.date).toString() +
                    '</span>'+
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});

$(function() {

    var data = {
        lastID: 0,
        pizzas: []
    };


    var octopus = {
        addPizza: function() {
            var thisID = ++data.lastID;

            data.pizzas.push({
                id: thisID,
                visible: true
            });
            view.render();
        },

        removePizza: function(pizza) {
            var clickedPizza = data.pizzas[ pizza.id - 1 ];
            clickedPizza.visible = false;
            view.render();
        },

        getVisiblePizzas: function() {
            var visiblePizzas = data.pizzas.filter(function(pizza) {
                return pizza.visible;
            });
            return visiblePizzas;
        },

        init: function() {
            view.init();
        }
    }


    var view = {
        init: function() {
            var addPizzaBtn = $('.add-pizza');
            addPizzaBtn.click(function() {
                octopus.addPizza();
            });

            // grab elements and html for using in the render function
            this.$pizzaList = $('.pizza-list');
            this.pizzaTemplate = $('script[data-template="pizza"]').html();

            // Delegated event to listen for removal clicks
            this.$pizzaList.on('click', '.remove-pizza', function(e) {
                var pizza = $(this).parents('.pizza').data();
                octopus.removePizza(pizza);
                return false;
            });

            this.render();
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $pizzaList = this.$pizzaList,
                pizzaTemplate = this.pizzaTemplate;

            // Clear and render
            $pizzaList.html('');
            octopus.getVisiblePizzas().forEach(function(pizza) {
                // Replace template markers with data
                var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);
                $pizzaList.append(thisTemplate);
            });
        }
    };

    octopus.init();
}());


$(function(){

    var model = {
        data : {
            lastId: 0,
            cats: [
                {
                    name: 'cat1',
                    img: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426'
                },
                {
                    name: 'cat2',
                    img: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
                },
                {
                    name: 'cat3',
                    img: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
                },
                {
                    name: 'cat4',
                    img: 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640'
                },
                {
                    name: 'cat5',
                    img: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480'
                }
            ]
        },
        init: function() {
        },
        getCats: function() {
            return this.data.cats;
        }
    };

    var octopus = {
        init: function() {
            octopus.setCurrentCat(model.data.lastId);
            model.getCats().forEach(function(cat){
                cat.id = model.data.lastId++;
                cat.count = 0;
            });
            viewList.init();
            viewCat.init();
            viewAdmin.init();
        },
        getCats: function() {
            return model.getCats();
        },
        getCat: function(id) {
            var dataCat;
            this.getCats().forEach(function(cat){
                if (cat.id === id) {
                    dataCat = cat;
                    return true;
                }
            });
            return dataCat;
        },
        setCurrentCat: function(id) {
            model.data.currentCatId = id;
            viewAdmin.render();
        },
        getCurrentCat: function() {
            return this.getCat(model.data.currentCatId);
        },
        incCount: function() {
            this.getCurrentCat().count++;
            viewCat.render();
            viewAdmin.render();
        },
        updateCurrentCat: function(data) {
            var cat = this.getCurrentCat();
            for (var i in data) {
                cat[i] = data[i];
            }
            viewList.render();
            viewCat.render();
        }
    };


    var viewList = {
        init: function() {
            this.$catList = $('.cats-list');
            this.$catList.on('click','button',function(){
                var id = $(this).data('id');
                octopus.setCurrentCat(id);
                viewCat.render();
            });
            this.render();
        },

        render: function() {
            var $list = this.$catList,
                row = '';
            octopus.getCats().forEach(function(cat){
                row +='<button data-id="'+cat.id+'">'+cat.name+'</button>';
            });
            this.$catList.html(row);
        }
    };

    var viewCat = {
        init: function() {
            this.$view = $('.cat-preview');
            this.template = $('script[data-template="cat"]').html();
            this.$view.on('click','img',function(){
                octopus.incCount();
            });
            this.render();
        },
        render: function() {
            var cat = octopus.getCurrentCat();
            var thisTemplate = this.template;
            thisTemplate = thisTemplate.replace(/{{name}}/g, cat.name);
            thisTemplate = thisTemplate.replace(/{{img}}/g, cat.img);
            thisTemplate = thisTemplate.replace(/{{count}}/g, cat.count);
            this.$view.html(thisTemplate);
            this.$count = this.$view.find('.cat-click');
        },
        renderCount: function() {
            this.$count.text(octopus.getCurrentCat().count);
        }
    };

    var viewAdmin = {
        init: function() {
            this.$self = $('#admin');
            this.$btnMode = $('.admin-mode',this.$self);
            this.$btnSave = $('.save',this.$self);
            this.$btnCancel = $('.cancel',this.$self);

            var $form = $('.admin-form', this.$self);

            this.$btnSave.bind('click', function(e){
                e.preventDefault();
                var data = {};
                $form.find('input[type=text]').each(function(){
                    data[$(this).attr('name')] = $(this).val();
                });
                octopus.updateCurrentCat(data);
                $form.hide();
            });

            this.$btnCancel.bind('click', function(e){
                e.preventDefault();
                $form.hide();
            });

            this.$btnMode.bind('click', function(e){
                e.preventDefault();
                $form.show();
            });

            this.render();
        },
        render: function() {
            var cat = octopus.getCurrentCat();
            for (var i in cat) {
                $('input[name='+i+']',this.$self).val(cat[i]);
            }
        }
    };
    octopus.init();
}());