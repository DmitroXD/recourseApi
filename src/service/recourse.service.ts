import {Repository} from "typeorm";
import {Recourse} from "../entity";
import {CreateRecourseDto, UpdateRecourseDto} from "../controller/dto";

export class RecourseService {
    constructor(
        private readonly recourseRepository: Repository<Recourse>
    ) {}

    async findAll() {
        return await this.recourseRepository.find();
    }

    async findOne(id: number) {
        return await this.recourseRepository.findOneByOrFail({ id });
    }

    async create(data: CreateRecourseDto) {
        return await this.recourseRepository.save(
            this.recourseRepository.create({
                ...data,
            }),
        );
    }

    async update(id: number, data: UpdateRecourseDto) {
        const existingRecourse = await this.findOne(id);
        return await this.recourseRepository.save({
            ...existingRecourse,
            ...data,
        });
    }

    async updateAll(data: UpdateRecourseDto) {
        return await this.recourseRepository
            .createQueryBuilder()
            .update(Recourse)
            .set({ ...data })
            .execute()
    }

    async delete(id: number) {
        await this.recourseRepository.softDelete(
            await this.recourseRepository.findOneByOrFail({ id })
        );
    }

}