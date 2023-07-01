import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { dayPassValidationSchema } from 'validationSchema/day-passes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.day_pass
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDayPassById();
    case 'PUT':
      return updateDayPassById();
    case 'DELETE':
      return deleteDayPassById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDayPassById() {
    const data = await prisma.day_pass.findFirst(convertQueryToPrismaUtil(req.query, 'day_pass'));
    return res.status(200).json(data);
  }

  async function updateDayPassById() {
    await dayPassValidationSchema.validate(req.body);
    const data = await prisma.day_pass.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDayPassById() {
    const data = await prisma.day_pass.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
