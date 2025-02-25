import {ColorPickerWidget} from "@/samples/custom-components/ColorPickerWidget.tsx";
import {DateRangeWidget} from "@/samples/custom-components/DateRangeWidget.tsx";
import {AddressWidget} from "@/samples/custom-components/AddressWidget.tsx";
import {Widget} from "@rjsf/utils";
import {ImageUploadWidget} from "@/samples/custom-components/ImageUploadWidget.tsx";
import { CustomCaptchaWidget } from "./CustomCaptchaWidget";
import {CustomMultiSelectWidget} from "@/samples/custom-components/CustomMultiSelectWidget.tsx";

const widgets: { [name: string]: Widget } = {
    ColorPicker: ColorPickerWidget,
    DateRangeWidget: DateRangeWidget,
    AddressWidget: AddressWidget,
    ImageUploadWidget,
    CustomCaptchaWidget,
    CustomMultiSelectWidget
}

export default widgets;