export interface OauthToken {
  id_token: string,
  access_token: string,
  expire_in: number,
  scope: string,
  refresh_token: string,
  token_type: string
}
