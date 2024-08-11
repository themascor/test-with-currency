import { Observable } from "rxjs";
import { ConvertResponse } from "../../../http/types/convert-response.";

export interface SummaryWidgetDataProvider {
    readonly summaryData$: Observable<ConvertResponse  | null> 
 }
