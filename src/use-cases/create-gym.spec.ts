import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymRepository;
let sut: CreateGymUseCase;

describe("Create gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.4963243,
      longitude: -46.6222736,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
