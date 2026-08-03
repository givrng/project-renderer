export type createProjectDto ={
    title: string;
    organizationName: string;
    description: string;
}

export type createCertificateDto = {

      certId: string,
      firstName: string,
      orgName: string,
      lastName: string,
      projectTitle: string,
      startDate:string,
      endDate:string,
      organizationLogo:string,
      impactArea:string
}