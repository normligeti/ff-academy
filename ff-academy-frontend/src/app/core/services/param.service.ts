import { inject, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { DIFFICULTY_NAME_TO_ORDER } from "../utils/difficulty.enum";

@Injectable()
export class ParamService {
    private route = inject(ActivatedRoute);

    params$ = this.route.paramMap.pipe(
        map(params => ({
            trainingId: String(params.get('trainingId')),
            pillarOrder: Number(params.get('pillarOrder')),
            difficultyName: params.get('difficultyName') ?? '',
            difficultyOrder: DIFFICULTY_NAME_TO_ORDER[params.get('difficultyName') ?? '']
        }))
    );

}
