import { Badge } from "@shopify/polaris";

/**
 * converts string to start case
 * @param str any string
 * @returns string converted in start case format
 */
export const convertToStartCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
};

/**
 * converts string to start case
 * @param str any string
 * @returns string converted in start case format
 */
export const getStatusBadge = (status: string) => {
    if(status==='active') return <Badge status="success" children={convertToStartCase(status)} />;
    else if(status==='archived') return <Badge  children={convertToStartCase(status)} />;
    if(status==='draft') return <Badge status="info" children={convertToStartCase(status)} />;
};