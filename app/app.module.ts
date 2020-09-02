import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Trace } from "@nativescript/core";
import { AppComponent } from "~/app.component";

Trace.enable();

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
