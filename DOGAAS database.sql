-- Dog storage --
CREATE TABLE Dogs (
    dogID int NOT NULL,
	imageURL varchar(255) NOT NULL,
    PRIMARY KEY (dogID)
);

CREATE TABLE Tags (
    tagName varchar(255) NOT NULL,
    PRIMARY KEY (tagName)
);

CREATE TABLE DogTags (
    dogID int NOT NULL,
    tagName varchar(255) NOT NULL,
    PRIMARY KEY (dogID, tagName),
	CONSTRAINT FKDogID
		FOREIGN KEY (dogID)
			REFERENCES Dogs (dogID),
	CONSTRAINT FKTagName
		FOREIGN KEY (tagName)
			REFERENCES Tags (tagName)
);

-- Admin --
CREATE TABLE Admins (
    adminName varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    PRIMARY KEY (adminName)
);

CREATE TABLE EndPoints (
    endPoint varchar(255) NOT NULL,
	method varchar(6) NOT NULL,
	requestCount int NOT NULL,
    PRIMARY KEY (endPoint)
);

CREATE TABLE Users (
    userName varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    PRIMARY KEY (userName)
);