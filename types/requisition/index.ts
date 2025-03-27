export interface Requisition {
  jobRequisitions: JobRequisition[];
  meta: Meta;
}

export interface JobRequisition {
  itemID: string;
  postingInstructions: PostingInstruction[];
  links: Link[];
  supportedLocaleCodes: string[];
  clientRequisitionID: string;
  requisitionStatusCode: RequisitionStatusCode;
  job: Job;
  requisitionLocations: RequisitionLocation[];
  hiringManager: HiringManager;
  compensationVisibleIndicator: boolean;
  locationVisibleIndicator: boolean;
  organizationalUnits: OrganizationalUnit[];
  lieDetectorAcknowledgementIndicator: boolean;
  companyName: string;
  projectedStartDate: Date;
  openingsQuantity: number;
  openingsFilledQuantity: number;
  visibleToJobSeekerIndicator: boolean;
  evergreenIndicator: boolean;
  internalIndicator: boolean;
  externalIndicator: boolean;
  openingsNewPositionQuantity: number;
  workerTypeCode?: ECode;
}

export interface HiringManager {
  associateOID: string;
  workerID: WorkerID;
  personName: HiringManagerPersonName;
}

export interface HiringManagerPersonName {
  givenName: string;
  familyName1: string;
  formattedName: string;
}

export interface WorkerID {
  idValue: string;
}

export interface Job {
  jobCode: Code;
  jobTitle: string;
  occupationalClassifications: OccupationalClassification[];
}

export interface Code {
  codeValue: string;
  shortName?: string;
  longName?: string;
}

export interface OccupationalClassification {
  classificationCode: Code;
}

export interface Link {
  href: string;
  rel: string;
  title: string;
}

export interface OrganizationalUnit {
  itemID: string;
  nameCode: Code;
  typeCode: ECode;
}

export interface ECode {
  codeValue: string;
  shortName: string;
}

export interface PostingInstruction {
  nameCode: NameCode;
  postingChannel: PostingChannel;
  internalIndicator: boolean;
  resumeRequiredIndicator: boolean;
  postDate: string;
  expireDate: string;
  applicationMethods: ApplicationMethod[];
  validityAttestationIndicator: boolean;
}

export interface ApplicationMethod {
  contact: Contact;
}

export interface Contact {
  personName: ContactPersonName;
  communication: Communication;
}

export interface Communication {
  emails: Email[];
}

export interface Email {
  nameCode: ECode;
  emailUri: string;
}

export interface ContactPersonName {
  nameCode: ECode;
  formattedName: string;
}

export interface NameCode {
  codeValue: string;
  longName: string;
}

export interface PostingChannel {
  channelID: string;
  nameCode: Code;
  internetAddress: InternetAddress;
  externalIndicator: boolean;
  defaultIndicator: boolean;
}

export interface InternetAddress {
  uri: string;
}

export interface RequisitionLocation {
  itemID: string;
  nameCode: Code;
  address: Address;
}

export interface Address {
  lineOne?: string;
  cityName: string;
  countrySubdivisionLevel1?: CountrySubdivisionLevel1;
  countryCode: string;
  postalCode?: string;
}

export interface CountrySubdivisionLevel1 {
  codeValue: string;
}

export interface RequisitionStatusCode {
  effectiveDate: Date;
  codeValue: string;
  shortName: string;
}

export interface Meta {
  totalNumber: number;
}
