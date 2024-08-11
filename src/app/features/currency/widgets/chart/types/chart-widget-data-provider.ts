import { Observable } from "rxjs";
import { CourseResponse } from "../../../http/types/course-response";

export interface ChartWidgetDataProvider {
  updateCourse(base: string): void
  readonly courseResponse: Observable<CourseResponse | null>;
 
}

