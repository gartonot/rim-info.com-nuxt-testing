export interface ICharacterInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface ICharacterOrigin {
  name: string
  url: string
}

export interface ICharacterLocation {
  name: string
  url: string
}

export interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: ICharacterOrigin
  location: ICharacterLocation
  image: string
  episode: string[]
  url: string
  created: string
}

export interface ICharacterResponse {
  info: ICharacterInfo
  results: ICharacter[]
}
