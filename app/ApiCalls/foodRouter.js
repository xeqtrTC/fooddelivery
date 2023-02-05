
const { json } = require('body-parser');
const express = require('express');
const connection = require('../database/database');
const geocoder = require('../geolocation/geolocation');



const sqlDeleteFood = 'DELETE FROM food WHERE idfood = ?';
const sqlSelectFood = 'SELECT * FROM food';
const sqlSelectFoodDetails = 'SELECT * FROM food WHERE idfood = ?';
const sqlInsertestaurantchain = 'INSERT INTO restaurantchain SET ?';
const sqlInsertRestaurants = 'INSERT INTO restaurants SET ?';
const sqlSelectChainByName = 'SELECT * FROM restaurantchain WHERE nameofcity = ?'
const sqlSelectRestaurantByName = 'SELECT * FROM restaurants WHERE name = ?';
const sqlDeleteChainById = 'DELETE FROM restaurantchain WHERE id = ?';
const sqlDeleteRestaurantById = 'DELETE FROM restaurants WHERE idrestaurants = ?';
const sqlInsertIntoOrders = 'INSERT INTO orders SET ?';
const sqlInsertIntoRatings = 'INSERT INTO ratings SET ?';
const sqlCheckUserRating = 'SELECT * FROM ratings WHERE whorated = ? AND foodid = ?'


const deleteFood = (req, res) => {

    const { idfood } = req.body;

    if(req.user === undefined || req.user.admin === 0) {
        return res.status(401).json({ message: 'Not allowed'})
    } else {
        connection.query(sqlDeleteFood, [idfood], (err, resultOfDelete) => {
            if(resultOfDelete.affectedRows > 0){
                return res.status(200).json({ message: 'You have deleted food!'})
            } else if (err === null) {
                return res.status(409).json({ message: `Under that ${idfood} ID food doesn't exist!`})
            } else {
                return res.status(409).json({ message: `Something wrong `})
            }
        })
    }

}

const listOfFood = (req, res) => {
    console.log(req.query.value)

    connection.query(sqlSelectFood, (err, resultOfSelect) => {
        if(resultOfSelect.length > 0) {
            connection.query('SELECT',  (err, resultInfo) => {
                if(resultInfo) {
                    console.log(resultInfo);
                } else {
                    console.log(err);
                }
            })
            const sortByRating = resultOfSelect.sort((a, b) => { return b.foodrating - a.foodrating })
            console.log(sortByRating);
            return res.status(200).json(sortByRating)
        } else {
            return res.status(409).json({ message: "There isn't any food"})
        }
    })


}

const foodDetailsById = (req, res) => {
    const idfood = req.params.idfood

    connection.query(sqlSelectFoodDetails, [idfood], (err, resultOfDetails) => {
        if(resultOfDetails.length > 0) {
            return res.status(200).json(resultOfDetails)
        } else {
            return res.status(409).json({ message: "Under that ID food doesn't exist "})
        }
    })
}

const addLocationToChain = (req, res) => {

    const { nameofcity } = req.body;

    if (req.user === undefined || req.user.admin === 0) {
        return res.status(401).json({ message: 'You are not allowed'});
    } else if (req.user.admin > 0) {

        connection.query(sqlInsertestaurantchain, {nameofcity: nameofcity}, (err, resultOfInsert) => {
            if(resultOfInsert.affectedRows > 0) {
                return res.status(201).json({ message: 'You have successfully added new city to the chain!'})
            } else {
                return res.status(409).json({ message: 'Something broke!'})
            }
        })

    }

}

const addRestaurant = async (req, res) => {

    const { nameofrestaraunt, geolocation, geolocationname } = req.body;

    const location = await geocoder.geocode(geolocationname);
    

    if(req.user === undefined || req.user.admin === 0) {
        return res.status(401).json({ message: 'You are not allowed!'})
    } else if (req.user.admin > 0) {

        connection.query(sqlSelectChainByName, [geolocation], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {

                const idofchain = resultOfCheck[0].id

                connection.query(sqlSelectRestaurantByName, [nameofrestaraunt], (err, resultOfSecondCheck) => {
                    if(resultOfSecondCheck.length > 0) {
                        return res.status(401).json({ message: 'Restaraunt under that name already exists!'})
                    } else {
                        connection.query(sqlInsertRestaurants, {name: nameofrestaraunt, idofgeolocation: idofchain, geolocation: location[0].formattedAddress}, (err, resultOfInsert) => {
                            if(resultOfInsert) {
                                return res.status(201).json({ message: 'You have successfully added new restaurant'})
                            } else {
                                return res.status(401).json({ message: "Under that id location doesn't exist"})
                            }
                        })
                    }
                })
                
            } else {
                console.log(err);
                return res.status(401).json({ message: 'That city doesnt exist'})
            }
        })

        // connection.query(sql, {name: nameofrestaraunt, idofgeolocation: idofchain}, (err, resultOfInsert) => {
        //     if(resultOfInsert) {
        //         return res.status(201).json({ message: 'You have successfully added new restaurant'})
        //     } else {
        //         return res.status(401).json({ message: "Under that id location doesn't exist"})
        //     }
        // })

    }

}

const removeLocationChain = (req, res) => {
    const { nameofcity } = req.body;


    if(req.user === undefined || req.user.admin === 0) {
        return res.status(401).json({ message: 'You are not allowed'})
    } else if (req.user.admin > 0) {

        connection.query(sqlSelectChainByName, [nameofcity], (err, resultOfCheck) => {
            console.log(resultOfCheck)
            if(resultOfCheck.length > 0) {
                const id = resultOfCheck[0].id
                connection.query(sqlDeleteChainById, [id], (err, resultOfDelete) => {
                    if(resultOfDelete.affectedRows > 0) {
                        return res.status(201).json({ message: 'You have successfully deleted location!'})
                    } else {
                        console.log(err);
                        return res.status(401).json({ message: "Under that ID location doesn't exist"})
                    }
                })
            } else {
                return res.status(401).json({ message: "City under that name doesn't exist"})
            }
        })

        
        

    }

}

const removeRestaurant = (req, res) => {
    const { name } = req.body;


    if(req.user === undefined || req.user.admin === 0) {
        return res.status(401).json({ message: 'You are not allowed'})
    } else if (req.user.admin > 0) {
        
        connection.query(sqlSelectRestaurantByName, [name], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {
                const id = resultOfCheck[0].id
                connection.query(sqlDeleteRestaurantById, [id], (err, resultOfDelete) => {
                    if(resultOfDelete.affectedRows > 0) {
                        return res.status(200).json({ message: `You have successfully deleted ${name} restaurant`})
                    } else {
                        return res.status(401).json({ message: 'Something went wrong!'})
                    }
                })
            } else {
                return res.status(401).json({ message: `Restaurant ${name} doesn't exist`})
            }
        })
    }
}

const distance = async ({lat1, lon1, result, unit}) => {

    //Haversine formula 

    let arrayToSend = []
    for (const results of result) {
            const secondLocation = await geocoder.batchGeocode([results.geolocation])

            for (const locations of secondLocation) {

                const valueOfLocations = locations.value[0]

                const coordinates = [{
                    'lat2': valueOfLocations?.latitude,
                    'lon2': valueOfLocations?.longitude,
                    'nameOfStreet': valueOfLocations?.formattedAddress,
                    'nameOfRestaurant': results?.name,
                    'courier': results.courier,
                    'idOfRestaurant': results.idrestaurants
                }]

                for ( const cords of coordinates ) {

                    const radlat1 = Math.PI * lat1/180

                    const radlat2 = Math.PI * cords.lat2/180

                    const theta = lon1-cords.lon2

                    const radtheta = Math.PI * theta/180

                    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

                    if (dist > 1) {
                      dist = 1;
                    }

                    dist = Math.acos(dist)

                    dist = dist * 180/Math.PI

                    dist = dist * 60 * 1.1515

                    const transferIntoKM = dist * 1.609344

                    const arrayCombined = {
                        "coordinates": transferIntoKM,
                        "nameOfStreet": cords.nameOfStreet,
                        'nameOfRestaurant': cords.nameOfRestaurant,
                        'idOfRestaurant': cords.idOfRestaurant,
                        "courier": cords.courier
                    }
                    arrayToSend.push(arrayCombined);
                    
                }
    
            }
    }
    return arrayToSend
  }

const calculateSmallestDistance = ({infoAboutNearest}) => {
    let i = infoAboutNearest.length;

    let smallestNumber = infoAboutNearest[0].coordinates;

    for (const number of infoAboutNearest) {
        if (number?.coordinates < smallestNumber) {
            smallestNumber = {
                'coordinates': number.coordinates,
                'nameOfStreet': number.nameOfStreet,
                'nameOfRestaurant': number.nameOfRestaurant,
                'idOfRestaurant': number.idOfRestaurant
            }
        } else if (number.coordinates === smallestNumber) {  // ako je najblizi restoran prvi u arrayu
            smallestNumber = {
                'coordinates': number.coordinates,
                'nameOfStreet': number.nameOfStreet,
                'nameOfRestaurant': number.nameOfRestaurant,
                'idOfRestaurant': number.idOfRestaurant
            }
        }
    }
    return smallestNumber
}

const selectNearest = async (req, res) => {
    const sql = 'SELECT * FROM restaurants'
    const sql1 = 'SELECT * FROM `restaurants` WHERE `idrestaurants` NOT IN (SELECT `idrestaurant` FROM `orders` WHERE `timeorder` > NOW() - INTERVAL 15 MINUTE);'

    const [location] = await geocoder.geocode(req.user.geolocation)
    const lat1 = location.latitude;
    const lon1 = location.longitude;
    return new Promise((resolve, reject) => {
        connection.query(sql1, async (err, result) => {
            if(result.length > 0) {
                const infoAboutNearest = await distance({lat1, lon1, result})
                if(infoAboutNearest.length === 0) {
                    return reject(false)
                } else {
                    const calculateNearest = calculateSmallestDistance({infoAboutNearest})
                    
                    return resolve(calculateNearest);
                }
                
            } else {
                return reject(false)
            }
        })
    })
    
}

const orderFood = async (req, res) => {

    const { idfood } = req.body;

    try {
        const value = await selectNearest(req)
            connection.query(sqlInsertIntoOrders, {idfood: idfood, idrestaurant: value.idOfRestaurant, nameofstreet: value.nameOfStreet, iduserorder: req.user.iduser, timeorder: new Date()}, (err, resultOfInsert) => {
                if(resultOfInsert.affectedRows > 0) {
                    return res.status(201).json({ message: 'You have successfully ordered a food'})
                } else {
                    console.log(err);
                    return res.status(401).json({ message: 'Something broke'})
                }
            } )    
    } catch (error) {
        return res.status(401).json({ message: "There isn't any available right now, try again later"})

    }
   
    



}

const seeIsTimePassed = (req, res) => {
    connection.query('SELECT * FROM orders', (err, result) => {
        if(result) {
            const lastresult = result[2];
            console.log(lastresult)
            let past = new Date(lastresult.timeorder).getTime();
            console.log(past);
            const fiveMin = 1000 * 60 * 15;
            console.log(fiveMin)
            const isPast = (new Date().getTime() - past < fiveMin) ? console.log('ne') : console.log('da')
            console.log(isPast);
        }
    })
}  

const addReview = (req, res) => {

   const { foodid, ratingValue } = req.body;
   const idOfUser = req.user.iduser;

   

    connection.query(sqlCheckUserRating, [idOfUser, foodid], (err, result) => {
        if(result.length > 0) {
            return res.status(401).json({ message: 'You already rated this food!'})
        } else if (ratingValue > 5) {
            return res.status(401).json({ message: '5 is maximum value you can add'})
        } else {
            connection.query(sqlInsertIntoRatings, {foodid: foodid, ratingvalue: ratingValue, whorated: idOfUser }, async (err, resultOfInsert) => {
                if(resultOfInsert.affectedRows > 0) {
            
                    
                    try {

                        await updateRating(foodid)
                        return res.status(200).json({ message: 'You have successfully rated this food!'})
                        
                    } catch (error) {
                        return res.status(200).json({ message: 'Added review but rating failed'})
                    }
               
                } else {
                    return res.status(401).json({ message: 'Something broke!'})
                }
            })
        }
    })

}
const averageNumber = (listOfRatings) => {

    let sum = 0;

    listOfRatings.forEach((item) => sum += item);

    const averageValue = sum / listOfRatings.length;

    return averageValue

}

const updateRating = (foodid) => {

    const sql5 = 'UPDATE food SET foodrating = ? WHERE idfood = ?';
    const sql6 = 'SELECT ratingvalue from ratings WHERE foodid = ?';
    let sum = 0;
    let listOfRatings = []

    return new Promise((resolve, reject) => {
        connection.query(sql6, [foodid], (err, resultOfCheck) => {
            if(resultOfCheck.length > 0) {

                resultOfCheck.forEach((item) => listOfRatings.push(item.ratingvalue))

                const result = averageNumber(listOfRatings)
                
                if (result) {
                    connection.query(sql5, [result, foodid], (err, resultOfUpdate) => {
                        if(resultOfUpdate.affectedRows > 0) {
                            return resolve(true)
                        } else {
                            return reject(false)
                        }
                    })
                }     

            } else {
                return reject(false)
            }
        })
    })
    
    
}


const addComments = (req, res) => {

    const { idfood, comment } = req.body;

    const sql = 'SELECT * FROM orders WHERE idfood = ? AND iduserorder = ?';
    const sql2 = 'INSERT INTO comments SET ?'
    connection.query(sql2, {idfood: idfood, iduser: req.user.iduser, comment: comment}, (err, resultOfInsert) => {
        if(resultOfInsert.affectedRows > 0) {
            return res.status(201).json({ message: 'You have successfully added a comment!'})
        } else {
            return res.status(401).json({ message: 'Something broke!'})
        }
    })
    // connection.query(sql, [idfood, req.user.iduser], (err, resultOfCheck) => {
    //     if(resultOfCheck.length > 0) {
    //         if(comment.length > 1000) {
    //             return res.status(401).json({ message: 'Maximum letters for comment is 1000'})
    //         } else {
    //             connection.query(sql2, {idfood: idfood, iduser: req.user.iduser, comment: comment}, (err, resultOfInsert) => {
    //                 if(resultOfInsert.affectedRows > 0) {
    //                     return res.status(201).json({ message: 'You have successfully added a comment!'})
    //                 } else {
    //                     return res.status(401).json({ message: 'Something broke!'})
    //                 }
    //             })
    //         }
            

    //     } else {
    //         return res.status(401).json({ message: "You didn't order this food, you can't comment it!"})
    //     }
    // })

}
    







module.exports = {
    deleteFood,
    listOfFood,
    foodDetailsById,
    addLocationToChain,
    addRestaurant,
    removeLocationChain,
    removeRestaurant,
    selectNearest,
    orderFood,
    seeIsTimePassed,
    updateRating,
    addReview,
    addComments
    
}