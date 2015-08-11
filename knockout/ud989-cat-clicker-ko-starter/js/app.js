var myCats = [
    {
        name: 'cat1',
        imgSrc: 'https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426',
        nicknames: ['z','s']
    },
    {
        name: 'cat2',
        imgSrc: 'https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496'
    },
    {
        name: 'cat3',
        imgSrc: 'https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454'
    },
    {
        name: 'cat4',
        imgSrc: 'https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640'
    },
    {
        name: 'cat5',
        imgSrc: 'https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480'
    }
];

var Cat = function(data) {
    this.clickCount = ko.observable(data.clickCount || 0);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution || '');
    this.nicknames = data.nicknames || [];

    this.levelName = ko.computed(function(){
        if (this.clickCount() < 10) {
            return 'lev1';
        }
        if (this.clickCount() < 20) {
            return 'lev2';
        }
        if (this.clickCount() < 30) {
            return 'lev3';
        }
    },this);
};

var ViewModel = function() {
    this.catArr = ko.observableArray([]);
    this.currentCat = ko.observable();

    myCats.forEach(function(cat){
        this.catArr.push(
            new Cat(cat)
        )
    }.bind(this));

    this.setCurrentCat = function(item) {
        this.currentCat(item);
    }.bind(this);

    this.isCurrentCat = function(item) {
        return this.currentCat()
    };

    this.incrementCount = function() {
        this.clickCount(this.clickCount() + 1);
    };


    this.setCurrentCat(this.catArr()[0]);
};

ko.applyBindings(new ViewModel());