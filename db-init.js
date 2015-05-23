db.ratings.remove({})
db.artists.remove({})
db.raters.remove({})
db.raters.ensureIndex({ "name": 1 }, { unique: true });
db.ratings.ensureIndex({ "artist": 1, "rater": 1}, {unique: true});
db.artists.ensureIndex({ "name": 1 }, { unique: true });
db.artists.save({
  "name" : "Slovenia",
  "songName" : "Here For You",
  "startNumber" : 1,
  "ratings": []
});
db.artists.save({
  "name" : "France",
  "songName" : "N'oubliez Pas",
  "startNumber" : 2,
  "ratings": []
});
db.artists.save({
  "name" : "Israel",
  "songName" : "Golden Boy",
  "startNumber" : 3,
  "ratings": []
});
db.artists.save({
  "name" : "Estonia",
  "songName" : "Goodbye To Yesterday",
  "startNumber" : 4,
  "ratings": []
});
db.artists.save({
  "name" : "United Kingdom",
  "songName" : "Still In Love With You",
  "startNumber" : 5,
  "ratings": []
});
db.artists.save({
  "name" : "Armenia",
  "songName" : "Face The Shadow",
  "startNumber" : 6,
  "ratings": []
});
db.artists.save({
  "name" : "Lithuania",
  "songName" : "This Time",
  "startNumber" : 7,
  "ratings": []
});
db.artists.save({ "name" : "Serbia",
"songName" : "Beauty Never Lies",
"startNumber" : 8,
"ratings": []
});
db.artists.save({
  "name" : "Norway",
  "songName" : "A Monster Like Me",
  "startNumber" : 9,
  "ratings": []
});
db.artists.save({
  "name" : "Sweden",
  "songName" : "Heroes",
  "startNumber" : 10,
  "ratings": []
});
db.artists.save({
  "name" : "Cyprus",
  "songName" : "One Thing I Should Have Done",
  "startNumber" : 11,
  "ratings": []
});
db.artists.save({
  "name" : "Australia",
  "songName" : "Tonight Again",
  "startNumber" : 12,
  "ratings": []
});
db.artists.save({
  "name" : "Belgium",
  "songName" : "Rhythm Inside",
  "startNumber" : 13,
  "ratings": []
});
db.artists.save({
  "name" : "Austria",
  "songName" : "I Am Yours",
  "startNumber" : 14,
  "ratings": []
});
db.artists.save({
  "name" : "Greece",
  "songName" : "One Last Breath",
  "startNumber" : 15,
  "ratings": []
});
db.artists.save({
  "name" : "Montenegro",
  "songName" : "Adio",
  "startNumber" : 16,
  "ratings": []
});
db.artists.save({
  "name" : "Germany",
  "songName" : "Black Smoke",
  "startNumber" : 17,
  "ratings": []
});
db.artists.save({
  "name" : "Poland",
  "songName" : "In The Name Of Love",
  "startNumber" : 18,
  "ratings": []
});
db.artists.save({
  "name" : "Latvia",
  "songName" : "Love Injected",
  "startNumber" : 19,
  "ratings": []
});
db.artists.save({
  "name" : "Romania",
  "songName" : "All Over Again",
  "startNumber" : 20,
  "ratings": []
});
db.artists.save({
  "name" : "Spain",
  "songName" : "Amanecer",
  "startNumber" : 21,
  "ratings": []
});
db.artists.save({
  "name" : "Hungary",
  "songName" : "Wars For Nothing",
  "startNumber" : 22,
  "ratings": []
});
db.artists.save({
  "name" : "Georgia",
  "songName" : "Warrior",
  "startNumber" : 23,
  "ratings": []
});
db.artists.save({
  "name" : "Azerbaijan",
  "songName" : "Hour Of The Wolf",
  "startNumber" : 24,
  "ratings": []
});
db.artists.save({
  "name" : "Russia",
  "songName" : "A Million Voices",
  "startNumber" : 25,
  "ratings": []
});
db.artists.save({
  "name" : "Albania",
  "songName" : "I'm Alive",
  "startNumber" : 26,
  "ratings": []
});
db.artists.save({
  "name" : "Italy",
  "songName" : "Grande Amore",
  "startNumber" : 27,
  "ratings": []
});
