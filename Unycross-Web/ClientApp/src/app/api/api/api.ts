export * from './riders.service';
import { RidersCodegenService } from './riders.service';
export * from './tracks.service';
import { TracksCodegenService } from './tracks.service';
export * from './weatherForecast.service';
import { WeatherForecastCodegenService } from './weatherForecast.service';
export const APIS = [RidersCodegenService, TracksCodegenService, WeatherForecastCodegenService];
