import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

let checkInRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymRepository();
    sut = new CheckInUseCase(checkInRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-01",
      title: "JavaScript acad",
      description: " ",
      phone: "",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    console.log(checkIn.created_at);

    expect(checkIn.id).toEqual(expect.any(String));
  });

  // Red stage, green stage and refactor stage

  it("should not be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
