export interface FollowUserUseCase {
  follow(oauth_id: string, token: string): Promise<void>;
}
