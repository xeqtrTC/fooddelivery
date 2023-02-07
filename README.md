
Klonovati repository, uci u fooddelivery folder i uraditi docker-compose up.
Ubaciti postman fajl u postman, prebaciti parametre na body i svi parametri bi trebali da budu tu, kada se dodaje hrana body mora biti form-data.

Na pocetku postoje samo 3 vrste hrane.
Za pristupanje admin profilu:
               username: vegait
               password: admin
  
Za pristupanje listi hrane food/listOfFood, na pocetku pokazuje samo jedan komentar(ako postoji) za pristupanje vise korisnika potrebno je dodati listOfFood?id=BROJ
Za pristupanje detalja jedne hrane food/detailOfFood/:id
Za dodavanje hrane pristupiti food/addFood, prebaciti body parametre u form-data.
Za brisanje hrane pristupiti food/deleteFood, uneti ID hrane
Za narucivanje hrane pristupiti food/orderFood, uneti ID hrane 
Za ocenjivanje hrane pristupiti food/addReview, uneti ID hrane i ocenu (maksimalno 5)
Za dodavanje komentara pristupiti food/addComment, uneti ID hrane i komentar

Za dodavanje restorana pristupiti food/addRestaurant, uneti ime restorana i adresu (naprimer Pljevlja, Kralja Petra)
Za brisanje restorana pristupiti food/removeRestaurant, uneti ime restorana

Za registraciju korisnika pristupiti users/registerUser, uneti ime, sifru, adresu, prvo ime, zadnje ime
Za login pristupiti users/loginUser, uneti ime i sifru ( sifra je hashovana u bazi )
Za dodavanje korisnika kao admina pristupiti /users/updateUserToAdmin, uneti ID korisnika
Za logout pristupiti users/logoutUser

Korisceni paketi:
          multer,
          mysql2,
          nodegeocoder,
          passport,
          express-session,
          bcrypt,
          cors
          
