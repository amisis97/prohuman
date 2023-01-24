interface UserName {
  title: string;
  first: string;
  last: string;
}

interface UserPicture {
  thumbnail: string;
}

interface UserLocation {
  country: string;
  city: string;
  postcode: string;
}

export interface User {
  name: UserName;
  gender: 'male' | 'female';
  email: string;
  picture: UserPicture;
  location: UserLocation;
}

export interface Response {
  results: User[];
}
