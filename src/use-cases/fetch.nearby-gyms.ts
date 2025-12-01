import { Gym } from "@prisma/client";
import { GymRepository } from "@/repositories/gyms-repository";

interface FetchNearByGymsUseCaseRequest {
  userlatitude: number,
  userlongitude: number
}

interface FetchNearByGymsUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearByGymsUseCase {
  constructor(private gymsRepository: GymRepository) {}

  async execute({
    userlatitude,
    userlongitude
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
        latitude: userlatitude,
        longitude: userlongitude
    });

    return {
      gyms,
    };
  }
}
