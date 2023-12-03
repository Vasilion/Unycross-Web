export * from './auth.service';
import { AuthCodegenService } from './auth.service';
export * from './riders.service';
import { RidersCodegenService } from './riders.service';
export * from './tracks.service';
import { TracksCodegenService } from './tracks.service';
export * from './users.service';
import { UsersCodegenService } from './users.service';
export const APIS = [AuthCodegenService, RidersCodegenService, TracksCodegenService, UsersCodegenService];
