export interface Report {
  key: string;
  data: {
    reporterName: string;
    reporterPhoneNumber: string;
    troubleMakerName: string;
    locationName: string;
    latitude: string;
    longitude: string;
    pictureLink: string;
    extraInfo: string;
  };
}

export const dataset: Array<Report> = [

  ];