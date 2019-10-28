class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.dbConnection = undefined;
    this.table = undefined;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;

            if (this.table) {
                let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                let query = this.dbConnection.format(updateQuery, 
                        [table, "quality", this.items[i].quality, "name", this.items[i].name]);

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
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;

          if (this.table) {
              let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
              let query = this.dbConnection.format(updateQuery, 
                      [table, "quality", this.items[i].quality, "name", this.items[i].name]);

              this.dbConnection.query(query,(err, response) => {
                  if(err) {
                      console.error(err);
                  }
                  console.log(response.affectedRows);
              });

          } else {
              console.log("Fatal error: no table name!");
          }

          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;

                if (this.table) {
                    let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    let query = this.dbConnection.format(updateQuery, 
                            [table, "quality", this.items[i].quality, "name", this.items[i].name]);

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
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;

                if (this.table) {
                    let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    let query = this.dbConnection.format(updateQuery, 
                            [table, "quality", this.items[i].quality, "name", this.items[i].name]);

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
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;

        if (this.table) {
            let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
            let query = this.dbConnection.format(updateQuery, 
                    [table, "sellIn", this.items[i].sellIn, "name", this.items[i].name]);

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
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;

                if (this.table) {
                    let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                    let query = this.dbConnection.format(updateQuery, 
                            [table, "quality", this.items[i].quality, "name", this.items[i].name]);

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
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;

            if (this.table) {
                let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                let query = this.dbConnection.format(updateQuery, 
                        [table, "quality", this.items[i].quality, "name", this.items[i].name]);

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
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;

            if (this.table) {
                let updateQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                let query = this.dbConnection.format(updateQuery, 
                        [table, "quality", this.items[i].quality, "name", this.items[i].name]);

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
