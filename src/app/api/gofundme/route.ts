import { NextResponse } from 'next/server'

const GOFUNDME_URL =
  'https://www.gofundme.com/f/support-scholarships-and-womens-history-education'

const FALLBACK = {
  raised: 3000,
  goal: 10000,
  donors: 43,
  url: GOFUNDME_URL,
  title: 'Support Need-Based Scholarships for Girls',
  live: false,
}

export const revalidate = 60

type Money = { amount?: number }
type Fundraiser = {
  currentAmount?: Money
  goalAmount?: Money
  userDefinedGoalAmount?: Money
  donationCount?: number
  title?: string
  slug?: string
}

export async function GET() {
  try {
    const res = await fetch(GOFUNDME_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; HEREducationBot/1.0; +https://www.hereducation.org)',
        Accept: 'text/html',
      },
      next: { revalidate: 60 },
    })

    if (!res.ok) {
      return NextResponse.json(FALLBACK)
    }

    const html = await res.text()
    const match = html.match(
      /<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/
    )
    if (!match?.[1]) {
      return NextResponse.json(FALLBACK)
    }

    const data = JSON.parse(match[1]) as {
      props?: {
        pageProps?: {
          __APOLLO_STATE__?: Record<string, Fundraiser>
        }
      }
    }

    const apollo = data.props?.pageProps?.__APOLLO_STATE__ ?? {}
    const fundraiser = Object.values(apollo).find(
      (entry) =>
        entry &&
        typeof entry === 'object' &&
        'donationCount' in entry &&
        'currentAmount' in entry
    )

    if (!fundraiser) {
      return NextResponse.json(FALLBACK)
    }

    const raised = Number(fundraiser.currentAmount?.amount ?? FALLBACK.raised)
    const goal = Number(
      fundraiser.userDefinedGoalAmount?.amount ??
        fundraiser.goalAmount?.amount ??
        FALLBACK.goal
    )
    const donors = Number(fundraiser.donationCount ?? FALLBACK.donors)

    return NextResponse.json({
      raised,
      goal,
      donors,
      url: GOFUNDME_URL,
      title: fundraiser.title ?? FALLBACK.title,
      live: true,
    })
  } catch {
    return NextResponse.json(FALLBACK)
  }
}
