db.ratings.remove()
db.artists.remove()
db.raters.remove()
db.raters.ensureIndex({ "name": 1 }, { unique: true });
db.ratings.ensureIndex({ "artist": 1, "rater": 1}, {unique: true});
db.artists.ensureIndex({ "name": 1 }, { unique: true });
db.artists.save({ "name" : "Lithuania"		, "songName" : "This Time"						, "startNumber" : 1	, "ratings": [] });
db.artists.save({ "name" : "Ireland"		, "songName" : "Playing With Numbers"			, "startNumber" : 2	, "ratings": [] });
db.artists.save({ "name" : "San Marino"		, "songName" : "Chain of Lights"				, "startNumber" : 3	, "ratings": [] });
db.artists.save({ "name" : "Montenegro"		, "songName" : "Adio"							, "startNumber" : 4	, "ratings": [] });
db.artists.save({ "name" : "Malta"			, "songName" : "Warrior"						, "startNumber" : 5	, "ratings": [] });
db.artists.save({ "name" : "Norway"			, "songName" : "A Monster Like Me"				, "startNumber" : 6	, "ratings": [] });
db.artists.save({ "name" : "Portugal"		, "songName" : "Há Um Mar Que Nos Separa"		, "startNumber" : 7	, "ratings": [] });
db.artists.save({ "name" : "Czech Republic"	, "songName" : "Hope Never Dies"				, "startNumber" : 8	, "ratings": [] });
db.artists.save({ "name" : "Israel"			, "songName" : "Golden Boy"						, "startNumber" : 9	, "ratings": [] });
db.artists.save({ "name" : "Latvia"			, "songName" : "Love Injected"					, "startNumber" : 10, "ratings": [] });
db.artists.save({ "name" : "Azerbaijan"		, "songName" : "Hour Of The Wolf"				, "startNumber" : 11, "ratings": [] });
db.artists.save({ "name" : "Iceland"		, "songName" : "Unbroken"						, "startNumber" : 12, "ratings": [] });
db.artists.save({ "name" : "Sweden"			, "songName" : "Heroes"							, "startNumber" : 13, "ratings": [] });
db.artists.save({ "name" : "Switzerland"	, "songName" : "Time To Shine"					, "startNumber" : 14, "ratings": [] });
db.artists.save({ "name" : "Cyprus"			, "songName" : "One Thing I Should Have Done"	, "startNumber" : 15, "ratings": [] });
db.artists.save({ "name" : "Slovenia"		, "songName" : "Here For You"					, "startNumber" : 16, "ratings": [] });
db.artists.save({ "name" : "Poland"			, "songName" : "In The Name Of Love"			, "startNumber" : 17, "ratings": [] });