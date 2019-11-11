var {expect} = require('chai');
var {Shop, Item, Aged_Brie, Backstage, Sulfuras, Conjured} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {


  it("should be Test item title", function() {
    const gildedRose = new Shop([ new Item("Test item", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("Test item");
  });


  it("Quality should be degrade twice faster", function() {
    const gildedRose = new Shop([ new Item("Test item", 0, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  });


  it('Quality should be always positive', function() {
    const gildedRose = new Shop([ new Item("Test item", 0, 1), new Item("Test item", 2, 1) ]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    items.forEach(function(item) {
      expect(item.quality).to.equal(0);
    })
  })

  it('Aged Brie quality should be increased', function() {
    const gildedRose = new Shop([ new Item(Aged_Brie, 1, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(1);
  })

  it('Item quality should be less or equal 50', function() {
    const gildedRose = new Shop([ new Item(Aged_Brie, 1, 49), new Item("Item", 50, 90) ]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
    expect(items[1].quality).to.equal(48);
  })

  it('Should "Backstage passes" increase quality by two', function() {
    const gildedRose = new Shop([ new Item(Backstage, 10, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(7);
  })

  it('Should "Backstage passes" increase quality by three', function() {
    const gildedRose = new Shop([ new Item(Backstage, 3, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  })

  it('Should "Backstage passes" quality drops to 0', function() {
    const gildedRose = new Shop([ new Item(Backstage, 1, 40) ]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  })

  it('Should not change Sulfuras quality and sell in date', function() {
    const gildedRose = new Shop([ new Item(Sulfuras, 1, 20) ]);
    gildedRose.updateQuality();
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(80);
    expect(items[0].sellIn).to.equal(1);
  })

  it('Should "Conjured item" degrade twice faster', function() {
    const gildedRose = new Shop([ new Item(Conjured, 5, 10, true) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(8);
  })

});























