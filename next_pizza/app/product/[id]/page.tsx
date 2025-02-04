import { Container, GroupeVariant, ProductImg, Title } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) return notFound();
  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImg size={30} imageUrl={product.imageUrl} />
        <div className="w-[490px] bg-[#FCFCFC] p-7">
            <Title text={product.name} size="md" className="font-extrabold mb-1" />
            <div className="text-gray-400">unjdbjkvn djkfv  kdbfvkbndfjkv</div>
            <GroupeVariant/>
        </div>
      </div>
    </Container>
  );
}
