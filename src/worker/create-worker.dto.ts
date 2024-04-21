import { Expose } from 'class-transformer';

export const GROUP_ADMIN: string = 'admin';
export const GROUP_RH: string = 'rh';

export class CreateWorkerDto {
  constructor(partial: Partial<CreateWorkerDto>) {
    Object.assign(this, partial);
  }

  employee_id: string;
  first_name: string;
  last_name: string;
  nationality: string;
  department_id: bigint;
  national_id_number: string;
  @Expose({ groups: [GROUP_RH] })
  bank_account_number: string;
  @Expose({ groups: [GROUP_ADMIN, GROUP_RH] })
  monthly_salary: bigint;
  job_title: string;
  @Expose({ groups: [GROUP_ADMIN, GROUP_RH] })
  contract_start_date: string;
  @Expose({ groups: [GROUP_ADMIN, GROUP_RH] })
  contract_end_date: string;
}
