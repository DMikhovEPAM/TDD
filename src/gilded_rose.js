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

        this.isConjured = isConjured;
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
        if (fieldToUpdate === 'quality') {
            if(item[fieldToUpdate] < 0) {
                item[fieldToUpdate] = 0;
            } else if (item[fieldToUpdate]>50) {
                item[fieldToUpdate] = 50;
            }
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
        this.items.forEach(item => {
            let qualityValueToChange = 1;
            if (item.name !== Sulfuras) {
                this.updateItem(item, false, 1, 'sellIn');
            }
            if (item.sellIn < 0) {
                qualityValueToChange = 2
            }
            if ([Aged_Brie, Backstage, Sulfuras].indexOf(item.name) === -1) {
                this.updateItem(item, false, qualityValueToChange);
            } else if(item.name === Backstage) {
                if (item.sellIn < 0) {
                    qualityValueToChange = item.quality
                } else if (item.sellIn < 6) {
                    qualityValueToChange = 3
                } else if (item.sellIn < 11) {
                    qualityValueToChange = 2
                }
                // Increase value if item.sellIn >= 0 && drop it to 0 if item.sellIn < 0
                this.updateItem(item, item.sellIn >= 0, qualityValueToChange);
            } else if (item.name === Aged_Brie) {
                this.updateItem(item, true, 1);
            }
        })


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