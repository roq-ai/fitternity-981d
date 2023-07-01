import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DayPassInterface {
  id?: string;
  availability: boolean;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface DayPassGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
