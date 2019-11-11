class Item {
    constructor(name, sellIn, quality){
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality && typeof quality === 'number' && quality > 50 ? 50 : quality;
    }
}

class Shop {
    constructor(items=[]){
        this.items = items;
        this.dbConnection = undefined;
        this.table = undefined;
    }

    updateItem(item, isIncrease = true, fieldToUpdate = 'quality') {
        let quantity = 1

        if (isIncrease) {
            item[fieldToUpdate] += quantity
        } else {
            item[fieldToUpdate] -= quantity
        }

        if(item[fieldToUpdate] < 0 && fieldToUpdate === 'quality') {
            item[fieldToUpdate] = 0
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
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.updateItem(this.items[i], false);
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.updateItem(this.items[i]);


                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
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
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.updateItem(this.items[i], false, 'sellIn');
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
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
    Shop
}