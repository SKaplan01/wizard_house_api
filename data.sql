\c harry_potter

DROP TABLE IF EXISTS wizards;

CREATE TABLE wizards (
  id serial PRIMARY KEY,
  name varchar NOT NULL UNIQUE,
  house varchar NOT NULL,
  image_url varchar,
  CONSTRAINT house_check CHECK ( house IN ('ravenclaw', 'gryffindor', 'slytherin', 'hufflepuff'))
);

INSERT INTO wizards (name, house, image_url)
  VALUES  ('Harry Potter', 'gryffindor', 'https://knysnaloginnhotel.files.wordpress.com/2015/05/harry-potter-1.jpg'),
          ('Cedric Diggory', 'hufflepuff', 'https://images.pottermore.com/bxd3o8b291gf/1uZurZSTWwcC6Ww8UcQ8ws/e3ce3b91e3aa2a86ce8aaed542d62f98/CedricDiggory_WB_F4_CedricDiggoryWithHandsInPockets_Promo_080615_Port.jpg?w=1200'),
          ('Lucius Malfoy', 'slytherin', 'https://akns-images.eonline.com/eol_images/Entire_Site/2017919/rs_634x1024-171019123427-634.Jason-Isaacs-Harry-Potter.ms.101917.jpg?fit=inside|900:auto&output-quality=90'),
          ('Luna Lovegood', 'ravenclaw', 'https://images.pottermore.com/bxd3o8b291gf/Mam68Vfou2OO6kqEcyW8W/a9abc28e1e15bdd7d57f6257f3fed897/LunaLovegood_WB_F6_LunaLovegoodInQuibblerSpecsOnHogwartsExpress_Still_080615_Port.jpg?w=1200'),
          ('Filius Flitwick', 'ravenclaw', 'https://images.pottermore.com/bxd3o8b291gf/NrWvSifUC2aA20060gmmI/913a998fdae46b5f35f1bb34f13ceb0c/FiliusFlitwick_WB_F6_FlitwickSittingInGreatHall_Still_080615_Port.jpg?w=1200');