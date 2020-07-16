import numeral from 'numeral';
import { format, formatDistance } from 'date-fns'

const scales = {
    GB: 1000000000,
    MB: 1000000,
    kB: 1000
};

export const sizeFormatter = sizeInBytes => {
    for (const [name, size] of Object.entries(scales)) {
        if (sizeInBytes > size) {
            return numeral(sizeInBytes/size).format('0,0.00') + ' ' + name;
        }
    }
    return numeral(sizeInBytes).format('0,0') + ' bytes';

};

export const dateFormatter = dateStr => {
    return format(new Date(dateStr), 'dd-MM-yyyy HH:mm');
}

export const dateDistanceFormatter = dateStr => {
    return formatDistance(new Date(dateStr), new Date()) + ' ago';
}
