
##### Klonovati repository, uci u fooddelivery folder i uraditi docker-compose up.
##### Ubaciti postman fajl u postman, prebaciti parametre na body i svi parametri bi trebali da budu tu.
##### Na pocetku postoje samo 3 vrste hrane.
##### Za pristupanje admin profilu:
               username: vegait
               password: admin
  
<sup>Za pristupanje listi hrane food/listOfFood, na pocetku pokazuje samo jedan komentar(ako postoji) za pristupanje vise komentara potrebno je dodati listOfFood?id=broj</sup> <br>
<sup> Za pristupanje detalja jedne hrane food/detailOfFood/:id </sup><br>
<sup>Za dodavanje hrane pristupiti food/addFood, prebaciti body parametre u form-data. </sup> <br>
<sup> Za brisanje hrane pristupiti food/deleteFood, uneti ID hrane</sup> <br>
<sup> Za narucivanje hrane pristupiti food/orderFood, uneti ID hrane </sup> <br>
<sup>Za ocenjivanje hrane pristupiti food/addReview, uneti ID hrane i ocenu (maksimalno 5)</sup> <br>
<sup>Za dodavanje komentara pristupiti food/addComment, uneti ID hrane i komentar</sup> <br>

<sup>Za dodavanje restorana pristupiti food/addRestaurant, uneti ime restorana i adresu (naprimer Pljevlja, Kralja Petra)</sup> <br>
<sup>Za brisanje restorana pristupiti food/removeRestaurant, uneti ime restorana</sup> <br>

<sup>Za registraciju korisnika pristupiti users/registerUser, uneti ime, sifru, adresu, prvo ime, zadnje ime</sup> <br>
<sup>Za login pristupiti users/loginUser, uneti ime i sifru ( sifra je hashovana u bazi ) </sup> <br>
<sup>Za dodavanje korisnika kao admina pristupiti /users/updateUserToAdmin, uneti ID korisnika </sup> <br>
<sup>Za logout pristupiti users/logoutUser</sup> <br>

##### Korisceni paketi:
          multer,
          mysql2,
          nodegeocoder,
          passport,
          express-session,
          bcrypt,
          cors
          
