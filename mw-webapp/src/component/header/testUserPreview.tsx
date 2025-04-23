import {User, WayCollection} from "src/model/businessModel/User";

const ownWayCollection = new WayCollection({
  createdAt: new Date(),
  name: "own",
  ownerUuid: "d72b7abb-2135-4b7b-835c-2487a8dfc1fe",
  updatedAt: new Date(),
  uuid: "d72b7abb-2135-4b7b-835c-2487a8dfc1f1",
  ways: [],
});

const mentoringWayCollection = new WayCollection({
  createdAt: new Date(),
  name: "mentoring",
  ownerUuid: "d72b7abb-2135-4b7b-835c-2487a8dfc1fe",
  updatedAt: new Date(),
  uuid: "d72b7abb-2135-4b7b-835c-2487a8dfc1fe2",
  ways: [],
});

const favoriteWayCollection = new WayCollection({
  createdAt: new Date(),
  name: "favorite",
  ownerUuid: "d72b7abb-2135-4b7b-835c-2487a8dfc1fe",
  updatedAt: new Date(),
  uuid: "d72b7abb-2135-4b7b-835c-2487a8dfc1f3",
  ways: [],
});

export const testUserPreview = new User({
  uuid: "8l9tZl6gINP7j6BIT3p0yN9zZnH2",
  name: "Test Testerovich",
  email: "test.tester@gmail.com",
  description: "",
  createdAt: new Date(),
  favoriteForUserUuids: [],
  favoriteUsers: [],
  skills: [],
  contacts: [],
  wayRequests: [],
  imageUrl: "",
  isMentor: false,
  projects: [],
  customWayCollections: [],
  defaultWayCollections: {
    own: ownWayCollection,
    favorite: favoriteWayCollection,
    mentoring: mentoringWayCollection,
  },
});
