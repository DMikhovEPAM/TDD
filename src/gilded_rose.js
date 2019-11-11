const Aged_Brie = 'Aged Brie'
const Backstage = 'Backstage passes to a TAFKAL80ETC concert'
const Sulfuras = 'Sulfuras, Hand of Ragnaros'
const Conjured = 'Conjured staff'


class Item {
    constructor(name, sellIn, quality, isConjured = false){
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality && typeof quality === 'number' && quality > 50 ? 50 : quality;

        if(name===Sulfuras) {
            this.quality=80
        }

        this.isConjured = isConjured
    }
}

class Shop {
    constructor(items=[]){
        this.items = items;
        this.dbConnection = undefined;
        this.table = undefined;
    }

    updateItem(item, isIncrease = true, qualityValueToChange = 1, fieldToUpdate = 'quality') {

        if (isIncrease) {
            item[fieldToUpdate] += qualityValueToChange
        } else {

            if (item.isConjured && fieldToUpdate === 'quality'){
                qualityValueToChange *= 2
            }
            item[fieldToUpdate] -= qualityValueToChange
        }

        if(item[fieldToUpdate] < 0) {
            item[fieldToUpdate] = 0;
        } else if (item[fieldToUpdate]>50) {
            item[fieldToUpdate] = 50;
        }


        if (this.table) {
            let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
            let query = this.dbConnection.format(updateQuery,
                [this.table, "quality", item.quality, "name", item.name]);

            this.dbConnection.query(query,(err, response) => {
                if(err) {
                    console.error(err);
                }
                console.log(response.affectedRows);
            });
        } else {
            console.log("Fatal error: no table name!");
        }
    }


    updateQuality() {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].name != Aged_Brie && this.items[i].name != Backstage) {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != Sulfuras) {
                        this.updateItem(this.items[i], false);
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.updateItem(this.items[i]);


                    if (this.items[i].name == Backstage) {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.updateItem(this.items[i]);
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.updateItem(this.items[i]);
                            }
                        }
                    }
                }
            }
            if (this.items[i].name != Sulfuras) {
                this.updateItem(this.items[i], false, 'sellIn');
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != Aged_Brie) {
                    if (this.items[i].name != Backstage) {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != Sulfuras) {
                                this.updateItem(this.items[i], false);
                            }
                        }
                    } else {
                        this.items[i].quality = 0;
                        this.updateItem(this.items[i], false);
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.updateItem(this.items[i]);
                    }
                }
            }
        }


        return this.items;
    }
}
module.exports = {
    Item,
    Shop,
    Aged_Brie,
    Backstage,
    Sulfuras,
    Conjured,
}